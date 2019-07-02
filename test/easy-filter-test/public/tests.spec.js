setTimeout(function(){
  describe('currency',function(){
    var currencyContext = document.querySelector('#currency')
    it('default {{ 1000 | currency }} should equal $1,000.00',function(){
      var test = currencyContext.querySelector('.default').innerHTML.trim()
       if(test!== '$1,000.00'){
        throw new Error('结果为'+test)
       }
    })
  })
},2000)

