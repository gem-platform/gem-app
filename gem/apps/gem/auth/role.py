from typing import List

ADMIN = 1
GUEST = 2
GBC = 3
Secretary = 4

#
# def auth_req(roles : List[str]=[], permissions : List[str]=[]):
#     def decorator(func):
#         def wrapper(*args, **kwargs):
#             result = func(*args, **kwargs)
#             return result
#         return wrapper
#     return decorator

#@auth_req(roles=["admin"], permissions=["all"])
