const db = require("../db");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * We use it to get all data from the database
 */
exports.get = (req, res) => {
   //get data from database
   db.any("SELECT * FROM todos")
   .then((data) => {
    res.json(data);
   })
   .catch((err) => {
    console.log(err);
    res.json({
        message: "Data not found",
        error: err
    });
   });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * We use it to get data from the database by id
 */
exports.getById = (req, res) => {
    const id = req.params.id;
    db.one("SELECT * FROM todos WHERE id = $1", id)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        console.log(err);
        res.json({
            message: "Data not found",
            error: err
        });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * We use it to send data to the database
 */
exports.post = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const data = {
        title: title,
        description: description,
        status: status
    }
    //save data to database
    //use pg-promise to save data to database
    db.none("INSERT INTO todos (title, description, status) VALUES ($1, $2, $3)", [title, description, status])
    .then(() => {
        res.json({
            message: "Data saved successfully",
            data: data
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({
            message: "Data not saved",
            error: err
        });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * We use it to update data in the database
 */
exports.put = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const data = {
        title: title,
        description: description,
        status: status
    }
    db.none("UPDATE todos SET title = $1, description = $2, status = $3 WHERE id = $4", [title, description, status, id])
    .then(() => {
        res.json({
            message: "Data updated successfully",
            data: data
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({
            message: "Data not updated",
            error: err
        });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * We use it to delete data from the database
 */
exports.delete = (req, res) => {
    const id = req.params.id;
    db.none("DELETE FROM todos WHERE id = $1", id)
    .then(() => {
        res.json({
            message: "Data deleted successfully"
        });
    });
};
