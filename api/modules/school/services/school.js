var colors = require('colors');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var models = require.main.require('./app/components/models').all;
var services = require.main.require('./app/components/services').all;
var sequelize  = require.main.require('./app/components/db');
var sequelizeInclude = require.main.require('./api/components/sequelizeInclude');  
var transaction = require.main.require('./api/components/transaction.js');

var service = {
    name : 'school'
};

service.getGroupId = async (function(school, t) {
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
        }));
    }
    return instance.comment_group_id;
});



service.getAddresses = async (school => {
    return await(models.Address.findAll({
        where:{school_id: school.id}
    }));
});

service.setAddresses = async ((school, addresses) => {
    var currentAddresses = await(service.getAddresses(school));
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

service.update = async ((school, params) => {
    var instance = await(school.update(
        params
    ));
    if (params.addresses)
        await(service.setAddresses(school, params.addresses));
    return instance;
});


service.getForParse = async((govKeyId) => {
    var includeParams = {
        addresses: true
    };
    return await(models.School.findOne({
        where: {
            govermentKey: govKeyId       
        }, 
        include: sequelizeInclude(includeParams)
    }));
});

/**
 * @public
 */
service.viewOne = function(id) {
    var includeParams = {
        addresses: true,
        ratings: true
    };
    return await(models.School.findOne({
        where: {id: id},
        include: sequelizeInclude(includeParams) 
    }));
};


/**
 * @public
 */
service.search = async (params => {
    var searchParams = params.searchParams,
        includeParams ={},
	    whereParams = {};
    if (searchParams.name) {
	    whereParams.$or = [
		{
			name: {$like: '%' + searchParams.name + '%'} 
		}, {
			fullName:{$like: '%' + searchParams.name + '%'} 
		}
    	];
    }

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
    
    //if (searchParams.gia) {
      // includeParams.city = {
      //      cityGia: {
      //          subject: {
      //              where: {
      //                  id: {
      //                      $or: [] 
      //                  }
      //              }
      //          }
      //      },
      //  };
      //  includeParams.giaResults = {
      //      subject: {
      //         where: {
      //             id: {
      //                $or: [] 
      //             }
      //         }
      //      },
      //      where: {
      //          result: {
      //              $gte: sequelize.col("city.cityGia.gia_result") 
      //          }
      //      }
      //  };
      //  searchParams.gia.forEach(subjectId => {
      //      includeParams.city.cityGia.subject.where.id.$or.push(subjectId);
      //      includeParams.giaResults.subject.where.id.$or.push(subjectId);
      //  });

    }

    var params = {
        where: whereParams
    };
    if (Object.keys(includeParams))
        params.include = sequelizeInclude(includeParams);
    var results = await (models.School.findAll(params));
    console.log('Found: ', colors.green(results.length));
    return JSON.stringify(results);
});

service.create = async (params => {
    var includeParams = {
        addresses: true
    };
    return await(models.School.create(
        params,
        {
            include: sequelizeInclude(includeParams)
        }
    ));
});

/**
 *@public
 */

service.commentTransaction = async (function(schoolId, params) {
    return await (transaction(service.comment, [schoolId, params]));
});
/**
 * @public
 */
service.comment = async (function(schoolId, params, t) {
    var includeParams = {
        commentGroup: true,
        ratings: true
    };
    console.log(sequelizeInclude(includeParams));
    var school = await (models.School.findOne({
        where: {id: schoolId},
        include: sequelizeInclude(includeParams)
    }, {transaction: t}));
    
    console.log(school);
    var commentGroup = await(service.getGroupId(school, t));
    console.log(commentGroup);
    if (params.score)
        params.rating = await(service.rate(school, params, t));
    return await (services.comment.create(commentGroup, params, t));
});



service.rate = async ((school, params, t) => {
    var rt = await (models.Rating.create({
        score: params.score
    }, {transaction: t}));
    await (school.addRating(rt));
    return rt;
});

/**
 * @public
 */
service.list = async (function() {
    var includeParams = {
        ratings: true
    };
    var schools = await (models.School.findAll(
        {
            order: [
                ['id', 'ASC']
            ],
            include: sequelizeInclude(includeParams)
        }
    ));
    return schools;
});

module.exports = service;
