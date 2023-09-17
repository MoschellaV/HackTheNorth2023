import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import moment from "moment";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    borderRadius: 4,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function EntryModal({ open, setOpen, prediction }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    function formatUnixToDateTime(unixTimestamp) {
        const date = new Date(unixTimestamp);
        const formattedDate = moment(date).format("YYYY-MM-DD");
        return formattedDate;
    }

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h5" component="h2" sx={{ fontSize: 26 }}>
                        {prediction.data.name}
                    </Typography>
                    <Typography
                        variant="p"
                        component="p"
                        sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            opacity: 0.5,
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {!isHovered
                            ? `predicted, ${moment(prediction.data.time).fromNow()}`
                            : `predicted,  ${formatUnixToDateTime(prediction.data.time)}`}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
