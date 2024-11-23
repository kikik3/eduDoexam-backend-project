const express = require("express");
const router = express.Router();


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
                        title: "Ujian II",
                        subtitle: "Kelas XI"
                    }
                ]
            })

        })
        childRoute.post("/", (req, res) => {
            res.json({})

        })
        childRoute.put("/:id", (req, res) => {
            res.json({})

        })
        childRoute.delete("/:id", (req, res) => {
            res.json({
                message: req.params.id
            })
        })

        childRoute(req, res, next);

    })


    examRoute.use("/users", (req, res, next) => {
        const childRoute = express.Router();
        childRoute.post("/", (req, res) => {
            res.json({})

        })
        childRoute.put("/:id", (req, res) => {
            res.json({})

        })
        childRoute.delete("/:id", (req, res) => {
            res.json({})

        })

        childRoute(req, res, next);

    })

    examRoute(req, res, next);
});


module.exports = router;