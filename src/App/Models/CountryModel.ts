import * as mongoose from "mongoose"

interface Country extends mongoose.Document {
	id: string
	originalId: number

	name: string
	province: string

	latitude: number
	longitude: number

	confirmed: number
	recovered: number
	deaths: number

	updatedAt: Date
	createdAt: Date
}

const CountrySchema = new mongoose.Schema({
	id: String,
	originalId: Number,
	name: String,
	province: String,
	latitude: Number,
	longitude: Number,
	confirmed: Number,
	recovered: Number,
	deaths: Number,
	updatedAt: Date,
	createdAt: Date
}, {
	timestamps: true
})

const CountryModel = mongoose.model<Country>("Country", CountrySchema)

export {Country, CountryModel, CountrySchema}
