import { Router } from 'express';
import { getBuilds, createBuild, getObjectById } from "../mongo.js";

const builds = Router();

builds.get('/:id', (request, response) => {
    getObjectById(request.params.id, "builds").then(
        (build) => {
            response.status(200).json({
                "status": "ok",
                "build": build
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

builds.get('/all', (request, response) => {
    getBuilds().then(
        (builds) => {
            response.status(200).json({
                "status": "ok",
                "builds": builds
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

builds.post('/create', (request, response) => {
    createBuild(request.body).then(
        (build) => {
            response.status(200).json({
                "status": "ok",
                "buildId": build.insertedId
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

export { builds };
