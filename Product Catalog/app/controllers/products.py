from system.core.controller import *

class Products(Controller):
    def __init__(self, action):
        super(Products, self).__init__(action)
        """
        Loading a model.
        """
        self.load_model('Product')
        self.db = self._app.db

        """
        Controller method to load a view
        """

    def index(self):
        all_products = self.models['Product'].get_all_products()
        return self.load_view('index.html', products = all_products)

    def new(self):
        return self.load_view('add_product.html')

    def edit(self, id):
        product = self.models['Product'].view_product(id)
        return self.load_view('edit_product.html', product= product[0])

    def show(self, id):
        product = self.models['Product'].view_product(id)
        return self.load_view('view_product.html', product=product[0])

    def create(self):
        self.models['Product'].add_product(request.form)
        return redirect('/')

    def destroy(self, id):
        self.models['Product'].delete_product(id)
        return redirect ('/')

    def update(self):
        self.models['Product'].modify_product(request.form)
        return redirect ('/')

    def goback(self):
        return redirect ('/')
