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

- Modified the random ray distribution algorithm to be quasi-random to improve performance and visuals.
- Optimized the raytracer with expression templates, multi-threading, and stable RNG for parallelism. We gained about a 250% perf boost compared to the original algorithm.
- Implemented dynamic mapping for threads and static mapping for MPI so each type of parallelism workload was properly distributed.
- Added the 'Blaze' C++ math library for high-performance vector and matrix computations from its expression templates.
- Integraded and thouroughly tested thread-safe randomization to prevent multithread related race conditions.

Issues we found

- Found performance bottlenecks due to missed vectorization opportunities and library overhead.
- We had our visuals breaking catastrophically from our multithreading not being thread safe at first. We had to adjust our implementation pretty significantly to make it thread-safe.
- Ended up with diminishing returns with additional threads, potentially due to library inefficiencies, poor task scheduling on our part, or bad compiler settings.

## GitHub Repo

Check out the [source code!](https://github.com/Lingo56/mpi-raytrace).
