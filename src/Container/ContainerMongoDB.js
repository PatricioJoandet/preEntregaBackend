import moongose from 'mongoose';

class ContainerMongoDB{
  constructor({name, schema}) {
    this.model = moongose.model(name, schema);
  }

  async getAll() {
    const res = await this.model.find();
    return res;
  }

  async save(obj) {
    const res = await this.model.create(obj);
    return res;
  }
  
  async getById(id) {
    const res = await this.model.findById( );
    return res;
  }

  async updateObj(id, obj) {
    const res = await this.model.findByIdAndUpdate(id, obj, { new: true });
    return res;
  }

  async deleteById(id){
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }
}

export { ContainerMongoDB };