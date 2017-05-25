import re

line = "program_id_lala"

els = line.split('_')
res = ''
for i in range(len(els)):
  w = els[i]
  if (i == 0):
    res += w[0].lower()+w[1:]
  else:
    res += w[0].upper()+w[1:]
print res
# def transform(m):
#   word = m.group(1)
#   return word[0].upper()+word[1:]

# result = re.sub(r'_(\w+)', transform, line)
# print result