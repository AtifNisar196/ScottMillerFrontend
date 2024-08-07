import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import bookImage from "../../assets/images/modalimage.jpg"; // Update with the correct path to your image

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BookModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <img
          src={bookImage}
          alt="Book"
          style={{ width: "100%", height: "auto" }}
        />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Discover the Edge of Mystery with Boundless.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Prepare for a gripping journey through chaos and vengeance with Scott
          L. Miller's Boundless, where every page pulses with suspense and
          mystery.
        </Typography>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default BookModal;
