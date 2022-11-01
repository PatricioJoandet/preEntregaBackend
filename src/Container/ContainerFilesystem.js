import fs from 'fs';

class ContainerFilesystem{
  constructor(name) {
    this.fileName = `./src/db/${name}.json`;
    this.content = [];
    this.firstRun();
  }

  async firstRun(){
    try{
      let data = await fs.promises.readFile(`${this.fileName}`);
      this.content = JSON.parse(data);
    }catch(err){
      if(err.code === "ENOENT"){
        await fs.promises.writeFile(this.fileName, JSON.stringify([], null, 3));
      }
      console.log(`Error: ${err}`);
    }
  }

  async getAll() {
    try {
      return this.content;
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }

  async save(obj) {
    try{
      const elements = await this.getAll();
      const id = elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;
      obj.id = id;
      elements.push(obj);
      await fs.promises.writeFile(this.fileName, JSON.stringify(this.content));
    }catch(error){
      console.log(error);
    }
  }
  
  async getRandom(){
    try{
      const data = await this.getAll();
      return data[Math.floor(Math.random() * data.length)];
    }catch (err){
      console.log(`Error: ${err}`);
    }
  }

  getById(id) {
    let res;
    if(this.content !== []){
      res = this.content.find(x => x.id === id)
      if(res === undefined){
        res = null;
      }
    }else{
      result = 'Archivo vacio'
    }
    return res;
  }

  async updateObj(id, obj) {
    const elements = this.content;
    const elementIndex = elements.findIndex( (element) => element.id == id)
    if(elementIndex == -1) return null;
    const foundElement = elements[elementIndex];
    elements[elementIndex] = {
      ...foundElement,
      ...obj
    }
    await fs.promises.writeFile(this.fileName, JSON.stringify(elements, null, 3));
    return foundElement;
  }

  async deleteById(id){
    let res;
    if(this.content !== []){
      let newC = this.content.filter(x=> x.id !== id);
      this.content = newC;
      await fs.promises.writeFile(this.fileName, JSON.stringify(this.content));
      res = 'Producto eliminado'
    } else {
      res = 'Archivo vacio'
    }
    return res;
  }
}

export { ContainerFilesystem };