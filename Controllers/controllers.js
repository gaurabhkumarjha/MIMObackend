const User_credentials = require("../Models/user"); // User Schema
const Playlistserver = require('../Models/Playlistimgserver');
const Mediaserver = require('../Models/Mediaserver');
const Contactus = require('../Models/Contactus');
const Likedplaylist = require('../Models/Likedplaylist');

exports.User_Func = async (req, res) => { // This function add user details 

    try {

        const { fullname, emailaddress, Date, AccType, profileImg, user_id, isverified, Phonenumber, others } = req.body;

        const isuserexist = await User_credentials.findOne({ user_id: user_id });
        //console.log(isuserexist);
        if (isuserexist) {
            return res.status(200).json({ message: "Logged in", isuserexist });
        } else {
            const Addnew_user = new User_credentials({
                fullname, emailaddress, Date, AccType, profileImg, user_id, isverified, Phonenumber, others
            });

            await Addnew_user.save();
            return res.status(201).json({ message: "Details saved", Addnew_user });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}

exports.Get_user_details = async (req, res) => { // Get individual user

    try {

        const { id } = req.params; // OBJ ID
        const User_details = await User_credentials.findById({ _id: id });
        // console.log(User_details);
        return res.status(200).json({ message: "User details", User_details })
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error })
    }

}

exports.Del_acc = async (req, res) => { // Delete account

    try {
        const { id } = req.params; // OBJ ID

        const Playlist_del = await Playlistserver.find({ user_id: id });
        const Media_del = await Mediaserver.find({ user_id: id });
        const Ticket_del = await Contactus.find({ user_id: id });
        const Liked_del = await Likedplaylist.find({ user_id: id });

        if (Playlist_del.length > 0) {
            await Playlistserver.deleteMany({ user_id: id });
        }
        if (Media_del.length > 0) {
            await Mediaserver.deleteMany({ user_id: id });
        }
        if (Ticket_del.length > 0) {
            await Contactus.deleteMany({ user_id: id });
        }
        if (Liked_del.length > 0) {
            await Liked_del.deleteMany({ user_id: id });
        }
        const Deleted_user = await User_credentials.findByIdAndDelete({ _id: id });

        return res.status(200).json({ message: "User deleted", Deleted_user })
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error })
    }

}

// exports.Server_for_Playlist_img = async (req, res) => {
//     try {
//         const { id } = req.params; // Obj_id
//         const { Playlistname } = req.body;
//         var Filename = "";
//         if (req.file) {
//             Filename = req.file.filename;
//         }

//         const Playlist_img_obj = new Playlistserver({
//             Playlistname: Playlistname,
//             playlistbannerimg: Filename,
//             user_id: id
//         })

//         await Playlist_img_obj.save();
//         //console.log(Playlist_img_obj);
//         return res.status(200).json({ message: "playlist img saved in our server", Playlist_img_obj })
//     } catch (error) {
//         console.log("Error in playlist img upload server", error);
//         return res.status(500).json({ message: '500', error })
//     }
// }

exports.Server_for_media = async (req, res) => {
    try {
        const { id } = req.params;
        const files = [] = req.files;
        var Media_files = [];
        if (files) {
            for (var i = 0; i < files.length; i++) {
                Media_files[i] = files[i].filename
            }
        }
        const Media_obj = new Mediaserver({
            user_id: id,
            mediarecord: Media_files

        })
        await Media_obj.save();
        // console.log(Media_obj);
        return res.status(200).json({ message: "Media saved in our server", Media_obj })
    } catch (error) {
        console.log("Error in playlist img upload server", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Get_existing_playlist = async (req, res) => {

    try {
        const { id } = req.params; // Obj_id
        const Playlist_obj = await Playlistserver.find({ user_id: id });
        return res.status(200).json({ Playlist_obj });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Check_playlistname = async (req, res) => {

    try {

        const { Playlistname } = req.body;

        const isvalid = await Playlistserver.find({ Playlistname: Playlistname });
        if (isvalid.length > 0) {
            return res.status(401).json({ isvalid });
        } else {
            return res.status(200).json({ isvalid });
        }

    } catch (error) {
        console.log(error);
    }
}

exports.Make_live = async (req, res) => {

    try {

        const { id } = req.params; // User_Obj_id
        const { Playlistname, Songname, Tag, media_obj_id } = req.body;
        var Filename = "";
        if (req.file) {
            Filename = req.file.filename;
        }

        const Live_obj = new Playlistserver({
            Playlistname: Playlistname,
            Songname: Songname,
            Tag: Tag,
            playlistbannerimg: Filename,
            Media_rec: media_obj_id,
            user_id: id
        });

        await Live_obj.save();
        // console.log(Live_obj);
        return res.status(201).json({ message: "Uploaded", Live_obj })

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Get_existing_playlist_data = async (req, res) => {
    try {
        const { Existing_playlistID } = req.params;

        const Selected_playlist_obj = await Playlistserver.findById({ _id: Existing_playlistID }).populate('Media_rec');
        // console.log(Selected_playlist_obj);
        return res.status(200).json({ Selected_playlist_obj })

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Make_live_in_existing = async (req, res) => {

    try {

        const { Exisit_id } = req.params;
        //console.log(Exisit_id);
        const { Playlistname, Songname, Tag, media_obj_id, playlistbannerimg } = req.body;
        var Filename = "";
        if (req.file) {
            Filename = req.file.filename;
        }
        const existingPlaylist = await Playlistserver.findById(Exisit_id);

        // Update the playlist details
        existingPlaylist.Playlistname = Playlistname;
        existingPlaylist.Songname = Songname;
        existingPlaylist.Tag = Tag;
        existingPlaylist.playlistbannerimg = Filename !== "" ? Filename : playlistbannerimg;
        if (media_obj_id) {
            // Add the new media_obj_id to the media_arr
            existingPlaylist.Media_rec.push(media_obj_id);
        }
        const updatedPlaylist = await existingPlaylist.save();
        // console.log(updatedPlaylist);
        return res.status(201).json({ updatedPlaylist });

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Get_all = async (req, res) => {
    try {

        const playlist_obj = await Playlistserver.find().populate('Media_rec').populate('user_id');
        return res.status(200).json({ playlist_obj });

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Get_user_playlist = async (req, res) => {
    try {

        const { id } = req.params;
        //console.log("User_id", id);
        const Playlist_obj = await Playlistserver.find({ user_id: id }).populate('Media_rec').populate('user_id');
        //console.log(Playlist_obj);
        if (Playlist_obj.length > 0) {
            const user_handel = Playlist_obj[0].user_id
            return res.status(200).json({ Playlist_obj, user_handel })
        } else {
            return res.status(404).json({ Playlist_obj })
        }
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Del_song = async (req, res) => {
    try {
        const { id } = req.params;
        const Deleted_song = await Mediaserver.findByIdAndDelete(id);
        return res.status(200).json({ Deleted_song })

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Delete_playlist = async (req, res) => {
    try {

        const { playlistid } = req.params;

        const Deleted_obj = await Playlistserver.findById(playlistid);
        // Check if the playlist exists
        if (!Deleted_obj) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // Get the list of media IDs associated with the playlist
        const mediaIds = Deleted_obj.Media_rec;

        // Delete each associated media object
        for (const mediaId of mediaIds) {
            // Delete the media object using its ID from another schema
            // Replace 'MediaModel' with the actual model name of your media schema
            await Mediaserver.findByIdAndDelete(mediaId);
        }

        // Now delete the playlist itself
        await Playlistserver.findByIdAndDelete(playlistid);
        // console.log(Deleted_obj);
        return res.status(200).json({ Deleted_obj })

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Ticket_saver = async (req, res) => {
    try {

        const { id } = req.params;
        const { subject, body } = req.body;

        const Contact_obj = new Contactus({
            subject: subject,
            body: body,
            user_id: id
        });

        await Contact_obj.save();
        return res.status(201).json({ Contact_obj });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Ticket_getter = async (req, res) => {
    try {

        const { id } = req.params;
        const Tickets_obj = await Contactus.find({ user_id: id });
        return res.status(200).json({ Tickets_obj })

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Resolve_tickets_by_MIMO = async (req, res) => {
    try {

        const { id } = req.params;
        const { reply } = req.body;

        const Reply_obj = await Contactus.findByIdAndUpdate({ _id: id }, {
            reply: reply
        });

        await Reply_obj.save();
        return res.status(201).json({ message: "Reply added", Reply_obj });

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Get_all_songs = async (req, res) => {
    try {

        const { id } = req.params;

        const Songs_obj = await Mediaserver.find({ user_id: id });

        return res.status(200).json({ Songs_obj })

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Change_verified_status = async (req, res) => {
    try {

        const { User_db_id } = req.params;
        const { status } = req.body;
        const Updated_status = await User_credentials.findByIdAndUpdate({ _id: User_db_id }, {
            isverified: status
        });

        await Updated_status.save();
        return res.status(200).json({ Updated_status });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Change_User_details = async (req, res) => {
    try {

        const { id } = req.params;
        const { fullname, phonenumber, emailaddress } = req.body;
        const Updated_status = await User_credentials.findByIdAndUpdate({ _id: id }, {
            fullname: fullname,
            emailaddress: emailaddress,
            Phonenumber: phonenumber
        });

        await Updated_status.save();
        return res.status(200).json({ Updated_status });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Add_liked_song = async (req, res) => {
    try {

        const { U_id } = req.params;
        const { M_data } = req.body;
        const User_data = await User_credentials.findOne({ user_id: U_id });
        if (User_data) {
            const Obj_id = User_data._id;
            const Song = M_data[0];
            const Liked_obj = await Likedplaylist.findOne({ songname: Song });
            if (Liked_obj) {
                return res.status(202).json({ message: 'Already added', Liked_obj });
            } else {
                const New_liked_obj = new Likedplaylist({
                    songname: Song,
                    Firebase_uid: U_id,
                    user_id: Obj_id
                });
                await New_liked_obj.save();
                return res.status(200).json({ New_liked_obj });
            }
        } else {
            return res.status(404).json({ message: 'user not found', User_data })
        }

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}

exports.Get_user_liked_song = async (req, res) => {

    try {
        const { U_id } = req.params;
        const Liked_obj = await Likedplaylist.find({ Firebase_uid: U_id });
        return res.status(200).json({ Liked_obj });

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }

}

exports.Del_liked_song = async (req, res) => {
    try {
        const { Song_name, U_id } = req.params;

        const User_lieked_playlist = await Likedplaylist.find({ Firebase_uid: U_id });
        // Filter the liked playlist to find the song to delete
        const songToDelete = User_lieked_playlist.find(song => song.songname === Song_name);
        if (!songToDelete) {
            return res.status(404).json({ message: 'Song not found in user\'s liked playlist' });
        }

        // Delete the song from the database
        await Likedplaylist.findByIdAndDelete(songToDelete._id);

        return res.status(200).json({ message: 'Song deleted from user\'s liked playlist' });

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: '500', error })
    }
}