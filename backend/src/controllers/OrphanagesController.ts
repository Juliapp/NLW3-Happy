import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    });

    try {
      await orphanagesRepository.save(orphanage);
    } catch (error) {
      console.error(error);
      response.status(404);
    }

    response.status(201).json(orphanage);
  },

  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find();
    return response.json(orphanages);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);

    await orphanagesRepository
      .findOneOrFail(id)
      .then((orphanage) => {
        return response.status(200).json(orphanage);
      })
      .catch((error) => {
        console.error(error);
        return response.status(404).send();
      });
  },
};
