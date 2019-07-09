module.exports = {
   getLastFourNumbers(cardNumber){
       return (parseInt(cardNumber.toString().slice(-4)))
   }
}