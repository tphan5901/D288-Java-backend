
export class Division {

  constructor(
    public division_name: string,
    public _links: {
      country: {
        href: string
      },
      self: {
        href: string
      }
    }
  ) {

  }

}
