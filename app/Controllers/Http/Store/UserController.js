'use strict'

const User = use('App/Models/User')

class UserController {

    async store({ request, response }) {
        try {
          const { email, password, role } = request.all()
          const user = await User.create({ email, password, role })
          return response.status(201).send(user)
        } catch (error) {
          return response.status(400).send({ message: 'Por favor, tente novamente!' })
        }
      }

    async show({ params: { id }, request, response, view }) {
        const user = await User.findOrFail(id)
        return response.send(user)
    }

    async update({ params: { id }, request, response }) {
        const user = await User.findOrFail(id)
        const { email, password } = request.only()
        user.merge({ email, password })
        await user.save()
        return response.send(user)
    }

    async destroy({ params: { id }, request, response }) {
        const user = await User.findOrFail(id)
        await user.delete()
        return response.status(204).send({ message: 'Deletado com sucesso!' })
    }
}

module.exports = UserController