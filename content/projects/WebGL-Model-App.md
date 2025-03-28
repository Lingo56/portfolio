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

## Project Details

My final project for SFU's Intro to Computer Graphics class. Everything here is written by me besides a couple libraries for matrix manipulation.

The lighting is based on Blinn Phong shading. One of the key challenges was getting the specular highlights to not break when multiple lights intersected. When lights overlapped the specular highlights would somehow overshoot and end up creating an unlit "hole" instead of a highlight. I ended up solving this by simplifying the algorithm. Initially I was over thinking and trying to multiply the different lights together, but adding to the same specular "pool" was all that was needed.

Loading the demo model and calculating its normals correctly took trial and error. Although the whole process was stop and go, the key one I remember was related to the depth buffer. The cow model was displaying completely wrong even though the math matched up exactly right. It turned out that I wasn't clearing the depth buffer each frame. As soon as I added the logic to clear it the model instantly loaded perfectly.

The camera was relatively straightforward compared to the rest of the project. We had implemented a perspective camera for a previous assignment so I adapted most of the logic from there. The main difficulty was from placing lights in the correct locations and rotating them properly. The spotlight especially I had difficulty wrapping my head around the correct matrix operations I needed to do to pan it left and right. After much trial and error my spotlight worked but it was panning the opposite direction from where the light was shinning. Months later when I came back to the project I looked at the logic again. I discoverd the issue was that somewhere in my logic I was only flipping the z-axis on my rotation matrix. Once I updated my code to flip both the x and z axis of my rotation matrix suddenly my spotlight worked perfectly.

## GitHub Repository

Check out the [source code on GitHub](https://github.com/Lingo56/WebGL-Viewer).
