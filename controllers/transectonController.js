const moment = require("moment")
const transectionModel = require("../models/transectionModel")

// Get controller

const getAllTransection = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body
        const transection = await transectionModel.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), "d").toDate(),
                },
            } : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1],
                },
            }),
            userid: req.body.userid,
            ...(type !== 'all' && { type })
        })
        res.status(200).json(transection)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }

}


// Add controller
const addTransection = async (req, res) => {
    try {
        const newTransectionModel = new transectionModel(req.body)
        await newTransectionModel.save()
        res.status(201).send('Transection Created')
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

// Edit controller
const editTransection = async (req, res) => {
    try {
        await transectionModel.findOneAndUpdate({ _id: req.body.transectionId }, req.body.payload)
        res.status(200).send('Transection Edit Successfully')

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

// Edit controller
const deleteTransection = async (req, res) => {
    try {
        await transectionModel.findOneAndDelete({ _id: req.body.transectionId }),
            res.status(200).send('Transection deleted Successfully')

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }


}

module.exports = { getAllTransection, addTransection, editTransection, deleteTransection }