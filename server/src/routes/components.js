import { Router } from 'express';
import { getComponents, createComponent, getObjectById } from "../mongo.js";

const components = Router();

components.get('/detail/:id', (request, response) => {
    getObjectById(request.params.id, "components").then(
        (component) => {
            response.status(200).json({
                "component": component
            });
        },
        (error) => {
            response.status(500).json({
                "status": "error",
                "message": error
            });
        }
    );
});

components.get('/all', (request, response) => {
    getComponents().then(
        (components) => {
            response.json({
                "caseColors": components.filter(component => component.name === "caseColor"),
                "powerDraws": components.filter(component => component.name === "powerDraw"),
                "gpus": components.filter(component => component.name === "GPU"),
                "cpus": components.filter(component => component.name === "CPU"),
                "motherboard": components.filter(component => component.name === "motherboard"),
                "ram": components.filter(component => component.name === "RAM"),
                "storage": components.filter(component => component.name === "storage"),
            });
        },
        (error) => {
            response.status(500).json({
                "status": "error",
                "message": error
            });
        }
    );
});

components.post('/create', (request, response) => {
    createComponent(request.body).then(
        (component) => {
            response.status(200).json({
                "componentId": component.insertedId
            });
        },
        (error) => {
            response.status(500).json({
                "status": "error",
                "message": error
            });
        }
    );
});

export { components };
