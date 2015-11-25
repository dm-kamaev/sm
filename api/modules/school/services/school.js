var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize  = require.main.require('./app/components/db');


exports.name = 'school';

exports.getGroupId = async (function(school, t) {
    var instance = school;
    if (typeof school === 'number'){
        var instance = await(models.School.findOne({
            where : {id: school}
        }));
    }
    if (instance.comment_group_id == null) {
        var newCommentGroup = await (models.CommentGroup.create());
        await (instance.update({
            comment_group_id: newCommentGroup.id
        }))
    }
    return instance.comment_group_id;
});


var getSchoolParams = (params) => {

    var schoolParams = {
        name: params.name,
        fullName: params.fullName,
        director: params.director,
        phonres: params.phones,
        site: params.site,
        goverment_key: params.goverment_key,
        schoolType: params.schoolType,
        addresses: [],
        educationInterval: params.educationInterval
    };

    params.addresses.forEach(adr => {
        schoolParams.addresses.push({
            name: adr,
            coords: []
        });
    });

    return schoolParams;
};

exports.getAddresses = async (school => {
    return await(models.Address.findAll({
        where:{school_id: school.id}
    }));
});

exports.setAddresses = async ((school, addresses) => {
    var currentAddresses = await(this.getAddresses(school));
    addresses.forEach((adr)=>{
        var sameAdr = currentAddresses.find(element => {
         if (element.name == adr.name)
            return true;
        });
        if (!sameAdr){
            models.Address.create(adr).then(adrinst => {
                school.addAddresses(adrinst);
            });
         }
    });
});

exports.update = async ((school, params) => {
    var convertedParams = getSchoolParams(params);

    var instance = await(school.update(
        convertedParams
    ));
    if (convertedParams.addresses)
        await(this.setAddresses(school, convertedParams.addresses));
    return instance;
});

exports.rate = async((school, comment, rating) => {

})

exports.getAllById = async((sch_id)=>{
    return await (models.School.findOne({
        where:{id: sch_id},
        include: [{
            all:true,
            nested: true
        }]
    }));
});

//TODO: refactor
exports.getForComment = async((sch_id) =>  {
    return await (models.School.findOne({
        where:{id: sch_id},
        include: [
            {
                model: models.Rating,
                as: 'ratings'
            },
            {
                model: models.CommentGroup,
            }
        ]
    }))
})

//TODO: переделать
exports.get = async((sqlizeOptions, params) => {
    params.include = [{
        model: models.Address,
        as: 'addresses'
    }];
    if (params.count == 'one') {
        return await (models.School.findOne(sqlizeOptions));
    }
    else
        return await (models.School.findAll(sqlizeOptions));
});

//TODO: refactor all of this
exports.getOneNudeByName = async((name) => {
	return await (models.School.findOne({
		where: {
			name : {
				$like: '%' + name + '%'
			}	
		}
	}));
});
exports.search = async (params => {
    var searchParams = params.searchParams,
	    whereParams = {};
    if (searchParams.name) //TODO: also search by long name
	    whereParams.$or = [
		{
			name: {$like: '%' + searchParams.name + '%'} 
		}, {
			fullName:{$like: '%' + searchParams.name + '%'} 
		}
    	];
    if (searchParams.classes && searchParams.classes.length) {
	    whereParams.educationInterval = { 
		    $contains: searchParams.classes
    	};
    }	
    if (searchParams.schoolType && searchParams.schoolType.length) {
	    whereParams.schoolType = {
		    $or:[]  
    	};
    searchParams.schoolType.forEach((item) => { 
	    whereParams.schoolType.$or.push(item);
   	});
}

return JSON.stringify(await (models.School.findAll({
	where: whereParams
})));
});

exports.create = async (params => {
    return await(models.School.create(
        getSchoolParams(params),
        {
            include: [
                {
                    model: models.Address,
                    as: 'addresses'
                }
            ]
        }
    ));
});


exports.comment = async (function(schoolId, params, t) {
    var school = await (this.getForComment(schoolId, t)),
        commentGroup = await(this.getGroupId(school, t));
    if (params.score)
        params.rating = await(this.rate(school, params, t));
    return await (commentServices.create(commentGroup, params, t));
});



exports.rate = async ((school, params) => {
    var rt = await (models.Rating.create({
        score: params.score
    }));
    await (school.addRating(rt));
    return rt;
});

exports.list = async (function() {
    var schools = await (models.School.findAll(
        {
            order: [
                ['id', 'ASC']
            ],
            // TODO: more specified include
            include: [{
                model: models.Rating,
                as: 'ratings'
            }]
        }
    ));
    return schools;
});
