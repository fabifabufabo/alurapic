export default class PictureService {
  constructor(resource) {
    this._resource = resource('v1/fotos{/id}');
  }
  list() {
    return this._resource.query().then((res) => res.json());
  }
  register(picture) {
    return this._resource.save(picture);
  }
  remove(id) {
    return this._resource.delete({ id });
  }
}
