
export class Country {

  constructor(
    public country_name: string,
    public _links: {
      self: {
        href: string
      }
    }
  ) {
    
  }

}
