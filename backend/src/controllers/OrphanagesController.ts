import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanagesView from '../views/orphanagesView';

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

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((images) => {
      return { path: images.filename };
    });

    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    await orphanagesRepository
      .save(orphanage)
      .then(() => {
        return response.status(201).json(orphanagesView.render(orphanage));
      })
      .catch((error) => {
        console.error(error);
        response.status(404);
      });
  },

  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });
    return response.json(orphanagesView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);

    await orphanagesRepository
      .findOneOrFail(id, {
        relations: ['images'],
      })
      .then((orphanage) => {
        return response.status(200).json(orphanagesView.render(orphanage));
      })
      .catch((error) => {
        console.error(error);
        return response.status(404).send();
      });
  },
};
