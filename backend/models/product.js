const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Mohon masukkan nama produk'],
        trim: true,
        maxLength: [100, 'Nama produk tidak boleh lebih dari 100 karakter']
    },

    jenis: {
        type: String,
        required: true,
        enum: ['Medium', 'Premium'], // Pilihan hanya Medium atau Premium
        message: 'Jenis produk hanya bisa Medium atau Premium'
    },

    harga: {
        type: Number,
        required: [true, 'Mohon masukkan harga produk'],
    },

    berat: {
        type: Number, // Dalam kilogram (kg)
        required: [true, 'Mohon masukkan berat produk'],
    },

    kemasan: {
        type: String,
        default: 'Karung', // Hanya ada satu jenis kemasan
        immutable: true // Tidak bisa diubah
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
        default: 0
    },

    jumlahReview: {
        type: Number,
        default: 0
    },

    review: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    dibuatPada: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);