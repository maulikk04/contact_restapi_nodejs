const model = require('../model/schema');
const errorhandeler = (err) => {
    const errors = err.message;
    return errors
}


const getcontacts = async (req, res) => {
    const contacts = await model.find({user_id : req.user.id});
    res.status(200).json({ contacts });
}

const createcontacts = async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        if (!name || !email || !phone) {
            res.status(404);
            throw new Error("All Fields are mandatory")
        }
        const contact = await model.create({ name, email, phone , user_id : req.user.id });
        res.status(200).json({ contact });
    } catch (error) {
        const err = errorhandeler(error);
        res.json({ err });
    }

} 

const putcontacts = async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await model.findById(id);
        if(contact.user_id.toString() !== req.user.id)
        {
            res.status(404);
            throw new Error("User don't have permission to update other user contact")
        }
        const updatedata = await model.findByIdAndUpdate(id, req.body);
        if (!updatedata) {
            res.status(404);
            throw new Error('Contact Not Found')
        }
        const newdata = await model.findById(id);
        res.json({ newdata })

    } catch (err) {
        const error = errorhandeler(err);
        res.json({error});

    }

}

const deletecontact = async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await model.findById(id);
        if(contact.user_id.toString() !== req.user.id)
        {
            res.status(404);
            throw new Error("User don't have permission to delete other user contact")
        }
        const deletedata = await model.findByIdAndDelete(id,req.body);
        if(!deletedata)
        {
            res.status(404);
            throw new Error ('Contact not found');
        }
        res.json({deletedata});
    } catch (err) {
        const error = errorhandeler(err);
        res.json({error}); 
    }
    
}


const getcontact = async (req, res) => {

    try {
        const contact = await model.findById(req.params.id);
        if (!contact) {
            throw new Error("contact not found");
        }
        else
            res.json({ contact });
    } catch (err) {
        const error = errorhandeler(err);
        res.json({ error });
    }

}

module.exports = { getcontacts, createcontacts, putcontacts, deletecontact, getcontact }