import {Coordinate} from "./Interfaces";

class CanvasUtil {

    static displayPin = (context: CanvasRenderingContext2D, coord: Coordinate, imageSrc: string) => {
        let image = new Image();
        image.src = imageSrc;
        image.onload = function () {
            const image_width = 30;
            const image_height = 40;

            const rect = context.canvas.getBoundingClientRect();
            const x = coord.x - rect.left - (image_width / 2);
            const y = coord.y - rect.top - image_height;

            context.drawImage(image, x, y, image_width, image_height);
        }
        image.onerror = function () {
            console.log("displayPinOnCanvas() onerror", this.src);
        }
    }

}



export default CanvasUtil;