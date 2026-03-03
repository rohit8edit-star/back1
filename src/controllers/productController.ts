import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().nonnegative(),
  description: z.string(),
});

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.parse(req.body);
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const product = await prisma.product.create({
      data: {
        ...validatedData,
        image,
      },
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.partial().parse(req.body);
    const updateData: any = { ...validatedData };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
