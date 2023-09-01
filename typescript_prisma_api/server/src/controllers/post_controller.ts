import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPost = async (req: express.Request, res: express.Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.sendStatus(400).json(error);
  }
};

export const getPostbyId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.sendStatus(400).json(error);
  }
};

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const createdPost = await prisma.post.create({
      data: {
        authorId: 1,
        ...req.body,
      },
    });
    return res.status(201).json(createdPost);
  } catch (error) {
    return res.sendStatus(400).json(error);
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const updatePost = await prisma.post.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    return res.status(200).json(updatePost);
  } catch (error) {
    return res.sendStatus(400).json(error);
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletePost = await prisma.post.delete({
      where: { id: Number(req.params.id) },
    });
    return res.status(200).json(deletePost);
  } catch (error) {
    return res.sendStatus(400).json(error);
  }
};

export const getUserPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userWithPost = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        post: {
          where: {
            published: true,
          },
        },
      },
    });
    const posts = userWithPost?.post;
    return res.status(200).json(posts);
  } catch (error) {
    return res.sendStatus(400).json(error);
  }
};
