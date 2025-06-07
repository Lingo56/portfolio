+++
date = '2023-08-05T02:47:13-08:00'
draft = false
title = 'WebGL Model Viewer'
tags = ["html5", "javascript", "webgl"]
summary = "Interactive model viewer with phong shading."
image = "/images/projects/WebGL-Model-App/WebGL-Model-App.png"
main = true
+++

{{< webgl-viewer >}}

{{< webgl-controls-table >}}

## Project Details

Final project for CMPT 361 - Intro to Computer Graphics

Everything here is written by me besides a couple libraries for matrix manipulation.

Lighting and Shading

- Implemented Blinn-Phong shading for realistic lighting effects.
- Solved specular highlight issues from overlapping lights by rewriting the specular calculation to simply add instead of overcomplicating it with various multiplication steps.

Model Loading

- Debugged many issues with loading the demo model and calculating normals.
- Fixed a critical issue where the depth buffer was not being cleared each frame, which caused the demo model to always load with broken vertices.

Camera and Spotlight

- Implemented perspective camera utilizing matrix operations.
- Overcame challenges in placing and rotating lights, particularly the spotlight, through notable trial and error.
- Fixed a spotlight panning issue by correctly flipping both the x and z axes in the rotation matrix.

## GitHub Repository

Check out the [source code on GitHub](https://github.com/Lingo56/WebGL-Viewer).
