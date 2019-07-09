const mongoose = require('mongoose')

const PayableSchema = new mongoose.Schema({
    status: [{
        statusPayable:{
            type: String,
            enum: ['paid', 'waiting_funds'],
            required: [true, 'Status de pagamento obrigatório'],
        },
        percentageFee: {
            type: Number,
            required: true
        },
        amountDay: {
            type: Number,
            required: true
        }
    }],
    paymentDate: {
        type: Date,
        required: [true, 'Data de pagamento obrigatória']
    },
    fee: {
        type: Number,
        required: [true, 'Taxa obrigatória']
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Payable', PayableSchema);