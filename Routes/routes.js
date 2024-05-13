const express = require('express');
const router = new express.Router();
const Controllers = require('../Controllers/controllers')
const playlistimageuploader= require('../Middleware/MulterUploadplaylistimage');
const Mediauploader= require('../Middleware/MulterUploadmedia');

router.post("/add/user/details", Controllers.User_Func); // Add user details. This API interact with User Schema.
router.get("/get/user/details/:id", Controllers.Get_user_details); // Get user details
router.delete("/delete/user/account/:id", Controllers.Del_acc); // delete account

// Server for image or media....
//router.post("/upload/in-server/playlist/image/:id", playlistimageuploader.single('playlistbannerimg'), Controllers.Server_for_Playlist_img) // Server work.
router.post("/upload/in-server/media/:id", Mediauploader.array('mediarecord', 5), Controllers.Server_for_media); // server work

// getting existing playlist
router.get("/get/existing/playlist/:id", Controllers.Get_existing_playlist); // get existing playlist
router.post("/get/is/avilabel", Controllers.Check_playlistname); // Check avilability

router.post("/make/live/:id", playlistimageuploader.single('playlistbannerimg'), Controllers.Make_live); // make live playlist and song's
router.get("/get/selected/playlist-data/:Existing_playlistID", Controllers.Get_existing_playlist_data); //Get selected playlist data.
router.put("/make/existing/live/changes/:Exisit_id",  playlistimageuploader.single('playlistbannerimg'), Controllers.Make_live_in_existing); // make live in existing mode

router.get("/get/all/playlist", Controllers.Get_all); // Get all.
router.get("/get/user/playlist/:id", Controllers.Get_user_playlist); // get playlist by id
router.delete("/del/this/song/:id", Controllers.Del_song); //delete song
router.delete("/delete/user/playlist/:playlistid", Controllers.Delete_playlist); // delete playlist

router.post("/post/ticket/:id", Controllers.Ticket_saver); // Ticket
router.get("/get/user/ticket/history/:id", Controllers.Ticket_getter); // get tickets history
router.put("/put/open/ticket/reply/:id", Controllers.Resolve_tickets_by_MIMO); // add reply by mimo



router.get("/get/user/songs/:id", Controllers.Get_all_songs); // Get all songs for dashboard

router.put("/update/user/email/verified-status/:User_db_id", Controllers.Change_verified_status); // change user verified status
router.put("/update/user/details/:id", Controllers.Change_User_details); // Update user details like: name, phnumber(conditional), email(conditional)


router.post("/add/user/liked/playlist/song/:U_id", Controllers.Add_liked_song); // add liked song playlist
router.get("/get/user/liked/playlist/song/:U_id", Controllers.Get_user_liked_song); //Get user liked song.
router.delete("/del/liked/songs/:Song_name/:U_id", Controllers.Del_liked_song); // Delete liked songs.






module.exports = router;