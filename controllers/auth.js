const authRouter = require('express').Router();
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { FIREBASE_CONFIG } = require("../utils/config");
const firebase = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(firebase);

authRouter.post('/login', async (request, response) => {

    const { email, password } = request.body;

    try {

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user  = userCredential.user;
        const token = await user.getIdToken();

        response.status(200).json({ 
            error: false,
            message: "Login successful", 
            user: {
                userId: user.uid, 
                token
            } 
        });

    } catch (error) {
        
        response.status(400).json({ 
            error: true,
            message: error.message 
        });
    }
});


// Register route
authRouter.post('/register', async (request, response) => {
    
    const { name, gender, email, password } = request.body;

    try {

        const db = getFirestore();

        /**
         * CREATE USER
         */
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        /**
         * STORE ATTRIBUTE
         */
        const docRef = db.collection('users').doc(user.uid);
        await docRef.set({ name: name, gender: gender });

        response.status(201).json({ 
            error: false,
            message: "User registered successfully", 
            userId: user.uid 
        });

    } catch (error) {
        
        response.status(400).json({ 
            error: true,
            message: error.message 
        });
    }
});

module.exports = authRouter;
