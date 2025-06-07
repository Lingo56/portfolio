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

- Improved Monte Carlo ray distribution with a quasi-random randomization algorithm for improved performance and visual quality.
- Rewrote ray tracing algorithm for multithreading and distributed computing, allowing significant performance gains over the original single-threaded implementation.
- Implemented dynamic mapping for threads and static mapping for MPI to balance workloads for each solution effectively.
- Integrated the 'Blaze' library for high-performance vector and matrix computations from its expression templates.
- Ensured thread-safe randomization to prevent multithread related race conditions.

### Challenges and Lessons Learned

- Found performance bottlenecks due to missed vectorization opportunities and library overhead.
- Debugged thread safety issues, particularly with random number generation, which caused critical rendering errors.
- Ended up with diminishing returns with additional threads, potentially due to library inefficiencies, poor task scheduling on our part, or bad compiler settings.

## GitHub Repository

Check out the [source code on GitHub](https://github.com/Lingo56/mpi-raytrace).
