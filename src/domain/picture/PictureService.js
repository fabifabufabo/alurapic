export default class PictureService {
  constructor(resource) {
    this._resource = resource('v1/fotos{/id}');
  }
  list() {
    return this._resource.query().then(
      (res) => res.json(),
      (err) => {
        console.log(err);
        throw new Error('Não foi possível obter as fotos.');
      }
    );
  }
  register(picture) {
    if (picture._id) {
      return this._resource.update({ id: picture._id }, picture);
    }
    return this._resource.save(picture);
  }
  remove(id) {
    return this._resource.delete({ id }).then(null, (err) => {
      console.log(err);
      throw new Error('Não foi possível remover a foto');
    });
  }
  search(id) {
    return this._resource.get({ id }).then((res) => res.json());
  }
}
