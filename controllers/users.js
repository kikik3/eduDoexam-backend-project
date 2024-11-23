const usersRouter = require('express').Router();
const middleware = require('../utils/middleware');
const { getFirestore } = require('firebase-admin/firestore');


// get user 
usersRouter.get('/:id', middleware.userExtractor, async (request, response) => {
    try {

        const uid = request.params.id;
        const db = getFirestore();
        const docRef = db.collection('users').doc(uid);
        const docSnapshot = await docRef.get(); // Get the document snapshot

        if (!docSnapshot.exists) {
            return response.status(404).json({
                error: true,
                message: 'User not found'
            });
        }

        response.json({
            error: false,
            message: "User fetch successful",
            user: docSnapshot.data()
        }); // Send the document data as the response

    } catch (error) {
        console.error('Error fetching user data:', error);
        response.status(500).json({
            error: true,
            message: 'Failed to retrieve user data'
        });
    }
});

// update user
usersRouter.put('/:id', middleware.userExtractor, async (request, response) => {

    try {

        const user = request.user;
        const uid = request.params.id;
        const { name, gender } = request.body;

        // Validate inputs
        if (!name || typeof gender === 'undefined') {
            return response.status(400).json({
                error: true,
                message: 'Both name and gender are required fields.',
            });
        }

        if (![0, 1].includes(gender)) {
            return response.status(400).json({
                error: true,
                message: 'Invalid gender. Gender should be 0 (male) or 1 (female).',
            });
        }

        if (name.trim().length <= 3) {
            return response.status(400).json({
                error: true,
                message: 'Invalid name. Name should have more than 3 characters.',
            });
        }


        if (user.uid !== uid) {
            return response.status(403).json({
                error: true,
                message: 'Unauthorized to update this user.',
            });
        }

        const db = getFirestore();
        const docRef = db.collection('users').doc(user.uid);

        // Update user details
        await docRef.update({ name: name, gender: gender });

        // Ensure that response is only sent once
        if (!response.headersSent) {
            response.status(200).json({
                error: false,
                message: 'User updated successfully.',
                userId: user.uid,
            });
        }

    } catch (error) {
        console.error('Error updating user:', error.message);
        response.status(500).json({
            error: true,
            message: 'Failed to update user. Please try again later.',
        });
    }
});

module.exports = usersRouter;
