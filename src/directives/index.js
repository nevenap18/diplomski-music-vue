/**
 * Directive's import is automatic and no explicit is needed
 * Everything you should do is to create a file for new directive
 * in the root of this directory (subdirectories are not allowed)
 * Directive file should export (default) object with name and methods properties
 * Name property is a string that will be used for directive name
 * Methods property is an object that should have some of custom directive's lifecycle methods
 * Directive's lifecycle methods are bind, inserted, update, componentUpdated and unbind
 */

 const modules = require.context('.', true, /\.js$/)
 const directives = []
 
 modules.keys().forEach(filePath => {
   const fileStructure = filePath.replace('./', '').replace('.js', '').split('/')
 
   if (fileStructure.length > 1) {
     return
   }
 
   const fileName = fileStructure[0]
 
   if (fileName === 'index') {
     return
   }
 
   const { name, methods } = modules(filePath).default
 
   if (typeof name !== 'string' || (typeof methods !== 'object' || Array.isArray(methods))) {
     return
   }
 
   let { bind, inserted, update, componentUpdated, unbind } = methods
 
   if (typeof bind !== 'function') bind = () => {}
   if (typeof inserted !== 'function') inserted = () => {}
   if (typeof update !== 'function') update = () => {}
   if (typeof componentUpdated !== 'function') componentUpdated = () => {}
   if (typeof unbind !== 'function') unbind = () => {}
 
   directives.push({
     name,
     methods: {
       bind,
       inserted,
       update,
       componentUpdated,
       unbind
     }
   })
 })
 
 export default directives
 