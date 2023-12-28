API = "/api/"

CREATE = "/create/"
LIST = "/list/"
EDIT = "/edit/"
DELETE = "/delete/"


class AdminURLS:
    admin = "admin"
    base_url = f"{API}{admin}"
    model_name = "{model_name}/"
    model_id = "{model_id}/"
    user_id = "{user_id}/"

    # POST
    create_url = CREATE + model_name
    # GET
    list_url = LIST + model_name
    # PATCH
    edit_url = EDIT + model_name + model_id
    # DELETE
    delete_url = DELETE + model_name + model_id

    # GET
    all_list_names_url = LIST + "all_names/"
