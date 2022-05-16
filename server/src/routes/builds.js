import { Router } from 'express';
import { getBuilds, createBuild, updateBuild, getObjectById } from "../mongo.js";

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

builds.put('/update/:id', (request, response) => {
    // Ignore the initial promise and pull the latest version of the object
    updateBuild(request.params.id, request.body)

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

export { builds };
