"""
    Routes Configuration File
    Routing rules
"""
from system.core.router import routes

"""
    Defining routes
"""
routes['default_controller'] = 'Products'
"""
    Adding routes and specifying their handlers
"""
routes['GET']['/products/new'] = 'Products#new'
routes['GET']['/products/edit/<id>'] = 'Products#edit'
routes['GET']['/products/show/<id>'] =  'Products#show'
routes['POST']['/products/destroy/<id>'] = 'Products#destroy'
routes['POST']['/products/update'] ='Products#update'
routes['POST']['/products/create'] = 'Products#create'
