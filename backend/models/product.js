const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Mohon masukkan nama produk'],
        trim: true,
        maxLength: [100, 'nama produk tidak bolehh lebih dari 100 karakter']
    },

    harga: {
        type: Number,
        required: [true, 'Mohon masukkan harga produk'],
        maxLength: [5, 'harga produk tidak boleh lebih dari 5 karakter'],
    },

    deskripsi: {
        type: String,
        required: [true, 'Mohon masukkan deskripsi produk']
    },

    ratings: {
        type: Number,
        default: 0
    },

    fotoProduk: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    stok: {
        type: Number,
        required: [true, 'Mohon masukkan stok produk'],
        maxLength: [5, 'stok produk tidak boleh lebih dari 5 karakter'],
        default: 0
    },

    jumlahReview: {
        type: Number,
        default: 0
    },

    review: [
        {
            name : {
                type: String,
                required: true
            },
            rating : {
                type: Number,
                required: true
            },
            comment : {
                type: String,
                required: true
            }
        }
    ],

    dibuatPada: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Product', productSchema);