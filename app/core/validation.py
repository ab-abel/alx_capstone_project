# check for Integers
def check_for_int(word):
    a = []
    for i in word:
        if(i.isdigit()):
            a.append(i)
    if(len(a)>=1):
        is_valid = True
    else:
        is_valid = False
    return is_valid

# check for white_space between words
def check_white_space(word):
    a = []
    for i in word:
        if(i.isspace()):
            a.append(i)
    if(len(a)>=1):
        is_valid = True
    else:
        is_valid = False
    return is_valid

# check for white
def validate_password(password:str):
    is_valid = False
    if (len(password)>=8 and not password.islower() 
        and not password.isupper() 
        and check_for_int(password) 
        and not check_white_space(password)):

        is_valid = True
    else:
        is_valid = False
    return is_valid

def detect_special_characters(pass_string:str):
    import re
    regex= re.compile('[@!#$%^&*()<>?/\\\|}{~:[\]`_]')
    if(regex.search(pass_string) == None): 
        res = False
    else: 
        res = True
    return res

def detect_dashes(pass_string):
    import re
    regex= re.compile('[-]')
    if(regex.search(pass_string) == None): 
        res = False
    else: 
        res = True
    return res

def check_if_empty(pass_string):
    if not pass_string:
        res = False
    else:
        res = True
    return res
