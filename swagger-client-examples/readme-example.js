var client = require('swagger-client');

var swagger = new client({
  url: 'http://petstore.swagger.io/v2/swagger.json',
  success: function() {
    swagger.pet.getPetById({petId:7},{responseContentType: 'application/json'},function(pet){
      console.log('pet', pet);
    });
  }
});
