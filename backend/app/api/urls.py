API = "/api/"

CREATE = "/create/"
LIST = "/list/"
EDIT = "/edit/"
DELETE = "/delete/"


class UserURLS:
    user = "user"
    base_url = f"{API}{user}"
    # POST
    register = "/register/"
    register_url = f"{base_url}{register}"
    # POST
    login = "/login/"
    login_url = f"{base_url}{login}"
    # GET
    user_data = "/user_data/"
    user_data_url = f"{base_url}{user_data}"
