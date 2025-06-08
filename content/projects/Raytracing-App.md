+++
date = '2024-12-05T02:47:13-08:00'
draft = false
title = 'Multithreaded Software Raytracer'
tags = ["c++"]
summary = "Software ray tracer with support for multithreading and MPI."
image = "/images/projects/Raytracing-App/Raytracing-App.png"
main = true
+++

{{< spacer >}}

{{< banner-images
src1="/images/projects/Raytracing-App/Raytracing-App.png"
alt1="Low GPU Load" >}}

## Project Details

Final project for CMPT 433 - Distributed Computing

The goal for this group project was for us to find an algorithm that could be parallelized and, using our knowledge that we learned during the course, implement the algorithm:

- Serially
- Multithreaded
- Distributed with MPI

We only implemented Peter Shirley's "Raytracing in a Weekend" as far we needed to for the algorithm to work at a basic level. The bulk of the time was working out bugs and getting his implementation to be thread-safe.

## Overview

{{< spacer >}}

- Improved ray distribution with a quasi-random algorithm for improved performance and visual quality.
- Optimized with expression templates, multi-threading, and stable RNG for parallelism, achieving 230% faster performance.
- Implemented dynamic mapping for threads and static mapping for MPI to balance workloads for each solution effectively.
- Integrated the 'Blaze' library for high-performance vector and matrix computations from its expression templates.
- Ensured thread-safe randomization to prevent multithread related race conditions.

Challenges and Lessons Learned

- Found performance bottlenecks due to missed vectorization opportunities and library overhead.
- Debugged thread safety issues, particularly with random number generation, which caused critical rendering errors.
- Ended up with diminishing returns with additional threads, potentially due to library inefficiencies, poor task scheduling on our part, or bad compiler settings.

## GitHub Repository

Check out the [source code on GitHub](https://github.com/Lingo56/mpi-raytrace).
