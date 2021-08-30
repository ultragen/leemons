module.exports = {
  config_page: {
    title: 'Conjunto de datos de las familias',
    description1:
      'Este conjunto de datos le permitirá descargar un conjunto de plantillas para cargar sin problemas su base de datos familiar.',
    important: 'Importante:',
    important_remember:
      'recuerde que no podrá cargar sus familias hasta que su base de usuarios esté correctamente cargada en el sistema.',
    tabs: {
      basic: 'Básico',
      dataset: 'Conjunto de datos personalizado',
      permissions: 'Permisos',
    },
    dataset_tab: {
      filter_by_center: 'Filtrar por centro',
      add_field: 'Añadir campo',
      no_data_in_table: 'Aun no hay datos',
      deleted_done: 'Item del dataset borrado',
      table: {
        name: 'Nombre',
        description: 'Descripción',
        type: 'Tipo',
        actions: 'Acciones',
        edit: 'Editar',
        delete: 'Borrar',
      },
    },
    remove_modal: {
      title: '¿Quieres eliminar el item?',
      message: 'Esta acción no puede deshacerse',
      cancel: 'No',
      action: 'Eliminar',
    },
  },
  list_page: {
    title: 'Lista de familias',
    description:
      'Las familias facilitan la gestión de la organización de grupos de padres y alumnos.',
    families: '{n} Familias',
    search: 'Buscar familia',
    families_found: 'Hemos encontrado {n} familias con el nombre {name}',
    view: 'Ver',
    table: {
      family: 'Familia',
      number: 'Numero',
      phone_number: 'Numero de teléfono',
      guardians: 'Tutores',
      students: 'Estudiantes',
      actions: 'Acciones',
    },
  },
  detail_page: {
    update_done: 'Familia actualizada',
    save_done: 'Familia creada',
    title_placeholder: 'Nombre de la familia',
    guardians: 'Tutores',
    add_guardian: 'Añadir tutor',
    students: 'Estudiantes',
    add_student: 'Añadir estudiante',
    other_information: 'Otros datos',
    assign_guardian_to_family: 'Asignar un tutor a la familia',
    assign_student_to_family: 'Asignar un estudiante a la familia',
    search_user_to_add: 'Buscar el usuario a añadir',
    search: 'Buscar',
    search_by_name: 'Nombre/apellido del usuario',
    search_by_email: 'Email',
    enter_name: 'Introduzca un nombre o un apellido',
    enter_email: 'Introduzca un email',
    add: 'Añadir',
    guardian_relation: 'Relación',
    specify_relation: 'Especifique la relación',
    deleted_done: 'Familia borrada',
    no_users_to_add:
      'No hemos encontrado ningún usuario asociado a estos datos, por favor, intente repetir la búsqueda utilizando otra información.',
    relations: {
      select_one: 'Seleciona uno...',
      father: 'Padre',
      mother: 'Madre',
      legal_guardian: 'Tutor legal',
      other: 'Otro',
    },
    table: {
      email: 'Email',
      name: 'Nombre',
      surname: 'Apellidos',
      created_at: 'Creado el',
    },
    maritalStatus: {
      select_marital_status: 'Seleccione el estado civil',
      married: 'Casado',
      divorced: 'Divorciado',
      domestic_partners: 'Parejas de hecho',
      cohabitants: 'Cohabitantes',
      separated: 'Separado',
    },
    remove_modal: {
      title: 'Eliminar familia',
      message: '¿Estas seguro de que quieres borrar esta familia?',
      cancel: 'Cancelar',
      action: 'Aceptar',
    },
  },
};
