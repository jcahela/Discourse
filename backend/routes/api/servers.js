const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { handleValidationErrors } = require("../../utils/validation")
const { requireAuth } = require("../../utils/auth")
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const { Server } = require("../../db/models");

const router = express.Router();

const validateCreateServerFields = [
    check('serverName')
        .exists({ checkFalsy: true })
        .withMessage('You must enter a server name'),
    check('serverName')
        .isLength({ max: 50})
        .withMessage('Server name must be less than 50 characters.'),
    handleValidationErrors,
]

router.get('/', asyncHandler(async(req, res) => {
    const servers = await Server.findAll();
    return res.json(servers)
}));

router.post(
    "/",
    singleMulterUpload("image"),
    validateCreateServerFields,
    requireAuth,
    asyncHandler(async (req, res) => {
        const { serverName } = req.body;
        const currentUser = req.user;
        
        let newServer;
        
        if (req.file) {
            const serverImageUrl = await singlePublicFileUpload(req.file);
            
            newServer = await Server.create({
                ownerId: currentUser.id,
                name: serverName,
                serverPicture: serverImageUrl,
            })
        } else {
            newServer = await Server.create({
                ownerId: currentUser.id,
                name: serverName,
            })
        }
        
        return res.json(newServer)
        
    }));
    
router.patch(
    '/:id(\\d+)',
    singleMulterUpload("image"),
    validateCreateServerFields,
    asyncHandler(async (req, res) => {
        console.log(req.file, 'INCOMING REQ.FILE')
        console.log(req.body, 'INCOMING REQ.BODY')
        const { serverName, image } = req.body;
        const serverId = req.params.id;
        const serverToUpdate = await Server.findOne({ where: { id: serverId} })
        if (req.file) {
            console.log(req.file)
            const serverImageUrl = await singlePublicFileUpload(req.file);
            await serverToUpdate.update({
                name: serverName,
                serverPicture: serverImageUrl
            })
        } else {
            console.log(image, 'THIS IS THE DESTRUCTURED IMAGE IF REMOVING AN IMAGE FROM A SERVER')
            await serverToUpdate.update({
                name: serverName,
                serverPicture: image || null
            })
        }
        res.json(serverToUpdate);
}))
    
    
    module.exports = router;
    