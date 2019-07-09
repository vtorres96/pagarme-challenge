const moment = require('moment')

module.exports = {
    verifyPaymentMethod(paymentMethod){
    
        if(paymentMethod == 'debit_card'){
            status = {
                statusPayable: 'paid',
                percentageFee: 0.03,
                amountDay: 0
            }
        } else {
            status = {
                statusPayable: 'waiting_funds',
                percentageFee: 0.05,
                amountDay: 30
            }
        }
        return status
    },

    calculatePaymentDate(date){
       return moment().add(date, 'days').format('YYYY-MM-DD')
    },

    calculateFee(amount, percentageFee){
        return (amount * percentageFee)
    }
}