+++
date = '2025-12-05T02:47:13-08:00'
draft = false
title = 'PAPR Point Cloud Editor'
tags = ["python", "pytorch", "cuda"]
summary = "Interactive point cloud selection and transformation UI for the PAPR algorithm"
image = "/images/projects/PAPR-App/PAPR-App.png"
main = true
+++

{{< spacer >}}

{{< video-player src="/videos/papr-demo.mp4" poster="/images/projects/PAPR-App/PAPR-App.png" fade="true" >}}

## Project Details

SFU Software Systems Capstone Project

Over a couple months I put together an interface for selecting and transforming points for the PAPR point rendering algorithm.

PAPR is a point-based neural rendering algorithm. It creates a render of a scene by shooting a ray from each pixel rendered, selecting the most relevant points for each ray, sending data from those points to a neural network, and then coloring every pixel of the render based on what the neural network outputs. On the surface it looks similar to Gaussian Splatting, but PAPR creates more accurate renders and also allows for editing the scene in realtime since it can quickly recalculate the render after points move.

The underlying neural network backend is built with pytorch, using NeRFStudio as a neural rendering framework, and the UI/render presentation layer is implemented with Viser. The bulk of the implementation work I did was getting pytorch data and bringing it into Viser's UI API so that you could manipulate points with Viser.
