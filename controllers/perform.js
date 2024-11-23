const express = require("express");
const router = express.Router();


router.post("/session/")

router.use("/:id", (req, res, next) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({
            error: true,
            message: "ID is required"
        });
    }

    const examRoute = express.Router();

    examRoute.get("/", (req, res) => {
        res.json({
            error: false,
            message: "",
            exam: {
                id: 123,
                title: "Ujian II",
                subtitle: "Kelas XI",
                questions: [
                    {
                        id: 123,
                        description: "Apa nama hewan di awali oleh huruf o",
                        duration: 10,
                        options: {
                            A: "Onta",
                            B: "Ounta",
                            C: "Oionta",
                            D: "Obunta"
                        }
                    }
                ]
            }
        })
    })

    examRoute.use("/questions", (req, res, next) => {

        const childRoute = express.Router();
        
        childRoute.get("/", (req, res) => {
            res.json({
                error: false,
                message: "",
                questions: [
                    {
                        id: 123,
                        description: "Apa nama hewan di awali oleh huruf o",
                        duration: 10,
                        options: {
                            A: "Onta",
                            B: "Ounta",
                            C: "Oionta",
                            D: "Obunta"
                        }
                    }
                ]
            })

        })
        
        childRoute.post("/", (req, res) => {
            res.json({
                status: true,
                message: "question add sucessfully",
                questions: []
            })

        })
        
        childRoute.put("/:id", (req, res) => {
            res.json({
                status: true,
                message: "question update sucessfully",
                questions: []
            })

        })
        
        childRoute.delete("/:id", (req, res) => {
            res.json({
                status: true,
                message: "question remove sucessfully",
                questions: []
            })
        })

        childRoute(req, res, next);

    })


    examRoute.use("/users", (req, res, next) => {
        
        const childRoute = express.Router();
        
        childRoute.get("/", (req, res) => {
            res.json({
                status: true,
                message: "users fetch sucessfully",
                users: []
            })
        })
        
        childRoute.post("/", (req, res) => {
            res.json({
                status: true,
                message: "users add sucessfully",
                users: []
            })
        })

        childRoute.delete("/:id", (req, res) => {
            res.json({
                status: true,
                message: "users remove sucessfully",
                users: []
            })
        })

        childRoute(req, res, next);

    })

    examRoute(req, res, next);
});


module.exports = router;