import { Request, Response } from 'express';
import { fetchDeals, createDeal, modifyDeal } from '../services/dealService';

export const getDeals = async (req: Request, res: Response) => {
  try {
    const deals = await fetchDeals();
    res.json(deals);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const addDeal = async (req: Request, res: Response) => {
  try {
    const newDeal = await createDeal(req.body);
    res.status(201).json(newDeal);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateDeal = async (req: Request, res: Response) => {
  try {
    const updatedDeal = await modifyDeal(req.params.id, req.body);
    res.json(updatedDeal);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
