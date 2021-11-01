import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface ClassroomCardProps {
    name: string,
    owner: string,
    id?: string,
    description?: string
}

const ClassroomCard: FunctionComponent<ClassroomCardProps> = ({ name, owner, id, description }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://media.istockphoto.com/vectors/classroom-nobody-school-classroom-interior-with-teachers-desk-and-vector-id1130490883?k=6&m=1130490883&s=612x612&w=0&h=R_ofyzDvkoX0vXdy2JkVLMWcnXXcv1p_elkeZIFxpJY="
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ClassroomCard;